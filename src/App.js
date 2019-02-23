import React, { Component } from 'react';
import './App.css';
import videoList from './videos.json';
import StackGrid from "react-stack-grid";
import Modal from 'react-responsive-modal';
import 'video-react/dist/video-react.css'; // import css
import { Player } from 'video-react';
import SearchInput from './components/SearchInput'
import Video from './components/Video'
import { groupBy } from './utils'
class App extends Component {

  state = {
    videoList : {},
    searchVideoList: {},
    isOpen: false,
    selectedVideo : null,
    searchText: ''
  }
  componentDidMount = () => {
    let activeVideos = videoList.filter( x => x.active && !x.browseable)
    let grouppedVideos = groupBy(activeVideos,'category')
    this.setState({videoList: grouppedVideos})
  }

toggleModal = () => {
  this.setState({isOpen: !this.state.isOpen})
}

onSelectVideo = (video) => {
  this.setState({selectedVideo: video},()=>{
    this.toggleModal()
  })
}

filter = (x,value) => {
  return x.title.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
         x.description.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
         x.category.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
         x.tags.filter( tag => tag.toLowerCase().indexOf(value.toLowerCase()) > -1).length > 0
}

searchVideo = (value) => {
  const searchVideos = videoList.filter(x=> x.active && ( this.filter(x,value)))
  let grouppedSearchVideos = groupBy(searchVideos,'category')
  this.setState({searchVideoList: grouppedSearchVideos})
}
onSearchChanged = (value) => {
  this.setState({searchText: value})
  this.searchVideo(value)
}
  render() {

    const { isOpen, selectedVideo, videoList, searchVideoList, searchText } = this.state
    const resultsVideo = !searchText  ? videoList : searchVideoList
    let self = this;
    return (
      <div className="App" style={{ backgroundColor: '#dedede', padding: 20 }}>
        <div>
          <SearchInput
            onChangeValue = {(value)=> this.onSearchChanged(value)}
          />
        {
         Object.keys(resultsVideo).length > 0 ? 
          Object.keys(resultsVideo).map((category)=> {
              const videos = resultsVideo[category]
              return (
                <div key={ category }>
                  <h2 style={{ textAlign: 'left', marginLeft: 30, top: 10 }}>{ category }</h2>
                  <StackGrid
                    columnWidth={300}
                  >
                    {
                      videos.map((video)=>(
                        <Video
                          key= { video.id }
                          onSelectVideo = { ()=> self.onSelectVideo(video) }
                          video = { video }
                        />
                      ))
                    }
                  </StackGrid>
                </div>
              )
            }) :
            <div style={{ padding: 20 }}> No Videos found for <span style={{ fontWeight: 'bold'}}>" {searchText} "</span></div>
        }
        </div>

        {
          isOpen &&
          <Modal open={ isOpen } onClose={this.toggleModal} >
            <div style={{ width: 700, height: 700 }}>
            <h2>{ selectedVideo.title }</h2>
            <Player
              autoPlay={true}
              playsInline
              poster={ selectedVideo.thumbUrl }
              src={ selectedVideo.videoUrl}
            />
            <div style={{ marginTop: 10 }}>{ selectedVideo.description }</div>
            </div>
          </Modal>
        }
      </div>
    );
  }
}

export default App;
