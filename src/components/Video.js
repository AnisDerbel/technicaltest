import React from 'react'
import playIcon from '../play.png'
import { convertTime } from '../utils'
import PropTypes from 'prop-types'

const Video = ({ video, onSelectVideo }) => (
  <div key={video.id} onClick={ onSelectVideo }>
    <img width={300} alt={video.title} height={200} style={{ margin: 10 }} src={video.thumbUrl}/>
    <span style={{ color: '#fff', position: 'absolute', top:20, right: 0, backgroundColor: '#000', padding: 5, borderRadius: 5, fontSize: 11 }}>{convertTime(video.runningTime)}</span>
    <img alt="" width={60} height={60} style={{ position: 'absolute', top: 80, left: 130}} src ={playIcon}/>
    <span>{video.title}</span>
  </div>
)

Video.propTypes = {
  video: PropTypes.object.isRequired,
  onSelectVideo: PropTypes.func.isRequired
};

export default Video