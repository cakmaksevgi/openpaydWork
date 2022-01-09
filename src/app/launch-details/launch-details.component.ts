import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap, tap } from "rxjs/operators";
import { LaunchDetailsGQL } from "../services/spacexGraphql.service";

@Component({
  selector: "app-launch-details",
  templateUrl: "./launch-details.component.html",
  styleUrls: ["./launch-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly launchDetailsService: LaunchDetailsGQL
  ) { }

  selectedPic: string;
  direction = Direction;
  leftScrollPosition: number = 300;
  scrollToLeft: boolean = false;

  launchDetails$ = this.route.paramMap.pipe(
    map(params => params.get("id") as string),
    switchMap(id => this.launchDetailsService.fetch({ id })),
    tap(res => this.selectedPic = res.data ? res.data.launch.links.flickr_images[0] : ''),
    map(res => res.data.launch)
  );

  onChangeImage(pic: string) {
    this.selectedPic = pic;
  }

  showPhotos(e: any, direction: Direction) {
    const el = document.getElementsByClassName("flickr-images")[0];
    if(direction == Direction.right) {
      this.leftScrollPosition += 300;
      el.scroll(this.leftScrollPosition, 0);
      this.scrollToLeft = true;
    } else {
      this.leftScrollPosition = this.scrollToLeft ? 0 : this.leftScrollPosition - 300;
      this.scrollToLeft = false;
      el.scroll(this.leftScrollPosition, 0);
    }
  }
}

export enum Direction {
  left,
  right
}
