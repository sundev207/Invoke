import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchOneUser, fetchOneUserByID, clearUsers } from '../actions/user_actions'




class BottomPlayBar extends React.Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.movebar = this.movebar.bind(this);
    this.clickbar = this.clickbar.bind(this);
    this.dragbar = this.dragbar.bind(this);
    this.dragdrop = this.dragdrop.bind(this);
    this.dragEnter = this.dragEnter.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragwidth = null;
    this.dragmusic = null;
    this.timeshow = this.timeshow.bind(this)
    this.setdata = this.setdata.bind(this);
    this.username = null;
    this.title = null;
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.audio.track_url !== "" && nextProps.audio.id !== this.props.audio.id){
      this.props.fetchOneUserByID(nextProps.audio.user_id)
    }
    if (this.props.audio.id === null){
      this.footer.className = "aintnothinghere"
    } else {
      this.footer.className = "audiofooter"
    }
  }

  // componentDidUpdate() AT SOME POINT WE WANT TO CLEAR ALL THE USERS UP FROM THE STATE
  timeshow(currenttime) {
      let minutes = parseInt(Math.floor(currenttime / 60));

      let seconds = parseInt(currenttime % 60);
      seconds = (seconds < 10) ? `0${seconds}` : seconds;
      if ( minutes === 0 ) {
        return `0:${seconds}`;
      }
      minutes = (minutes < 10) ? `0${minutes}` : minutes;
      return `${minutes}:${seconds}`;
    }







  movebar(e){
    let duration = this.music.duration;
    let currentTime = this.music.currentTime;
    this.fullduration.innerText = (this.timeshow(this.music.duration))


    let newval = currentTime/duration;
    let res = newval.toLocaleString("en", {minimumFractionDigits: 10, style: "percent"})
    this.playbar.style.width = res;
    this.timeelapased.innerText = `${this.timeshow(currentTime)}`
    let ballval = newval * this.playbarholder.clientWidth
    this.ball.style.left = ballval + 'px';

  }

  // We need to use this.clientX to get the X coordainate
  // Can use clientwidth to set the width
  // e.currentTarget.offsetleft ?
  // How to get the actual position of the thing.
  // Clientleft?
  // e.currentTarget.clientLeft to get the
  // e.target.offsetLeft + e.target.offsetParent.offsetLeft + e.target.offsetWidth

  clickbar(e){
    var holderwidth =  this.playbarholder.clientWidth
    let duration = this.music.duration
    var newpos = e.clientX - this.playbar.offsetLeft - this.playbar.offsetParent.offsetLeft;
    this.music.style.width = newpos;
    this.music.currentTime = (newpos/holderwidth) * duration;
    //

  }


  dragOver(e) {
    e.preventDefault()
       return false;
    }


  dragStart(e){
    e.dataTransfer.effectAllowed='move';
    e.dataTransfer.setData("Text", ev.target.getAttribute('id'));
    ev.dataTransfer.setDragImage(ev.target,0,0);
  }


  dragbar(e){
    // e.preventDefault();
    var holderwidth =  this.playbarholder.clientWidth
    console.log("hello");
    let duration = this.music.duration

    var newpos = e.clientX - this.playbar.offsetLeft - this.playbar.offsetParent.offsetLeft;
    this.dragwidth = newpos;
    this.dragmusic = (newpos/holderwidth) * duration;
    //
  }

  dragdrop(e){
    // e.preventDefault();
    this.playbar.style.width = this.dragwidth;
    this.music.currentTime = this.dragmusic;
  }

  dragEnter(e) {
    e.preventDefault();
    console.log("can put")
    return true;
  }

  setdata(){

    this.title.innerText = this.props.audio.title;
    this.username.innerText = this.props.artist.username;
  }



  handleClick(){
    if (this.music.paused){
      this.music.play()
      playbutton.className = "";
      playbutton.className = "pause";
    } else {
      this.music.pause();
		  playbutton.className = "";
		  playbutton.className = "play";
    };
  }

  // moveTracker(){
  // let duration;
  // var tracker  = document.getElementById("playhead")
  // var music = document.getElementById("audio")
  //
  // // timeupdate is when the tracker changes position
  // // adjust the CSS for the class?
  // Can check the duration of the player by doing this.audio.duration
  // Can check the current time by doing this.audio.currentTime
    // Can check if the track has ended by doing this.audio.ended -- when we do this we will want to move on the next song in the playlist.
    // this.audio.player - this will give us the amount of time that has been played in the song
    // Maybe can do width of the bar = duration/played
    // .timeupdate
    // ontimeupdate can be used to fire off the event.
    //1. make a bar which is has a set length (100%)
    // Need to add on to the width through our ref, like -- playbar.width += (valuedivision);
    //2. onclick of the line, we change the duration of the track to whatever we need.
    //
  // }


  render(){
    let audioplayer;

    // const artist = this.props.artist
    if (this.props.audio.track_url !== "") {

      audioplayer = <div className="playbar">
                          <audio onTimeUpdate={this.movebar} onCanPlay={this.setdata}  ref={audio => this.music = audio} autoPlay >
                            <source src={this.props.audio.track_url}type="audio/ogg" />
                            <source src={this.props.audio.track_url} type="audio/mpeg" />
                          </audio>
                              <div className="controls">
                                <button id="playbutton" className="pause" onClick={this.handleClick} />
                              </div>
                              <span className="time-elapsed" ref={span => this.timeelapased = span}></span>
                              <div className="progress-bar-background" ref={div => this.playbarholder = div} onClick={this.clickbar}    onDrop={this.dragdrop} onDragEnter={this.dragEnter} onDragOver={this.dragOver}>
                                <div className="dragball" ref={div => this.ball = div} onDragStart={this.dragbar} onDrag={this.dragbar}  draggable="true" ></div>
                                <div className="progress-bar" ref={div => this.playbar = div} onClick={this.clickbar} ></div>
                              </div>
                              <span className="full-duration" ref={span => this.fullduration = span}></span>
                              <div className="currentSongInfo"> <img  className="song-coverart-playerslice" src={this.props.audio.cover_art_url} />
                              <div className="song-infoplayer-slice">
                                <span ref={span=> this.username = span} ></span>
                                <span ref={span=> this.title = span} ></span>
                              </div>
                          </div>
                        </div>

    }

    return(
      <footer className="audiofooter" ref={footer => this.footer = footer}>
        {audioplayer}
      </footer>
    )
  }
}

const selectSingleArtist = (state) => {
  return state.users.byID[state.audio.user_id] || { username: "" };
}

const mapStateToProps = (state) => {
  return { audio: state.audio,
  artist: selectSingleArtist(state) }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => dispatch(fetchSongs()),
    clearUsers: () => dispatch(clearUsers()),
    fetchOneUser: (username) => dispatch(fetchOneUser(username)),
    fetchOneUserByID: (id) => dispatch(fetchOneUserByID(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomPlayBar);
