import React from 'react'

export default function testmonial() {
  return (
    <section className="testimonials-area section-gap">
    <div className="container">
      <div className="testi-slider owl-carousel" data-slider-id="1">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="item">
              <div className="testi-item">
                <img src="img/quote.png" alt="" />
                <div className="mt-40 text">
                  <p>
                  Bhandarakaras is great college to join lots of achivers and well 
                    educated staff
                  </p>
                </div>
                <h4>BY</h4>
                <p>BCA-B BATCH 13</p>
              </div>
            </div>
          </div>

          <div className="offset-lg-1 col-lg-6">
            <img src="img/testimonial/t1.jpg" alt="" />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="item">
              <div className="testi-item">
                <img src="img/quote.png" alt="" />
                <div className="mt-40 text">
                  <p>
                    Bhandarakaras is great college to join lots of achivers and well 
                    educated staff  <br />
                   
                  </p>
                </div>
                <h4>by</h4>
                <p>BCA_B BATCH-13</p>
              </div>
            </div>
          </div>

          <div className="offset-lg-1 col-lg-6">
            <img src="img/testimonial/t1.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}