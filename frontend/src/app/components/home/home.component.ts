import { AfterViewInit, Component } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  };

  ngAfterViewInit() {
    new Swiper('.review-slider', this.swiperConfig);
  }
}