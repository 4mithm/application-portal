import React from 'react'

export default function videoarea() {
  return (
    <section className="video-area section-gap-bottom">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-5">
          <div className="section-title text-white">
            <h2 className="text-white">
              Watch Our Trainers <br></br>
              in Live Action
            </h2>
            <p>
              In the history of modern astronomy, there is probably no one greater leap forward than the building and
              launch of the space telescope known as the Hubble.
            </p>
          </div>
        </div>
        <div className="offset-lg-1 col-md-6 video-left">
          <div className="owl-carousel video-carousel">
            <div className="single-video">
              <div className="video-part">
                <img className="img-fluid" src="img/video-img.jpg" alt=""/>
                <div className="overlay"></div>
                <a className="popup-youtube play-btn" href="https://www.youtube.com/watch?v=VufDd-QL1c0">
                  <img className="play-icon" src="img/play-btn.png" alt=""/>
                </a>
              </div>
              <h4 className="text-white mb-20 mt-30">Learn Angular js Course for Legendary Persons</h4>
              <p className="text-white mb-20">
                In the history of modern astronomy, there is probably no one greater leap forward than the building and
                launch of the space telescope known as the Hubble.
              </p>
            </div>

            <div className="single-video">
              <div className="video-part">
                <img className="img-fluid" src="img/video-img.jpg" alt=""/>
                <div className="overlay"></div>
                <a className="popup-youtube play-btn" href="https://www.youtube.com/watch?v=VufDd-QL1c0">
                  <img className="play-icon" src="img/play-btn.png" alt=""/>
                </a>
              </div>
              <h4 className="text-white mb-20 mt-30">Learn Angular js Course for Legendary Persons</h4>
              <p className="text-white mb-20">
                In the history of modern astronomy, there is probably no one greater leap forward than the building and
                launch of the space telescope known as the Hubble.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
