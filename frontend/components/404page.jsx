import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect  } from 'react-redux'

class Error404 extends React.Component {
  constructor(props){
    super(props)

  }


render(){

    if (this.props.location.pathname.slice(1,4) === 'you' || this.props.location.pathname.slice(1,9) === 'discover' || this.props.location.pathname.slice(1,11) === 'collection'){
      return (
        <div className="error-page">
          <h1 className="error-title">We're sorry, this part of Invoke is still under construction!</h1>
          <div className='sad-bunny-error'></div>
            <p className="errorText"> Please check back at a later date.</p>
            <div className="backhome">
              <a href="/#/stream">Take me back home</a>
              <PlaylistButton></PlaylistButton>
            </div>
        </div>
        )
    }
    else {
    return (
      <div className="error-page">
        <div className='cant-find-user'></div>
        <h1 className="error-title">We can’t find that user.</h1>
          <p className="errorText">A report has been sent to our tech brigade. <br/>  <br/>Please check back in a bit.</p>
          <div className="backhome">
            <Link to="/stream">Take me back home</Link>
          </div>
      </div>
      )
  }
}
}



export default withRouter(Error404)
