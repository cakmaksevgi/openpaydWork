import { LaunchFacadeService } from "./../services/launch-facade.service";
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ReplaySubject, timer } from 'rxjs';

@Component({
  selector: "app-launch-list",
  templateUrl: "./launch-list.component.html",
  styleUrls: ["./launch-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchListComponent {
  constructor(private readonly launchFacade: LaunchFacadeService) { }
  pastLaunches$ = this.launchFacade.pastLaunchListStoreCache();

  waitingList: ReplaySubject<boolean>;
  showCancelLoadingBtn: boolean = true;

  ngOnInit() {
    this.waitingList = new ReplaySubject();
    this.waitingList.next(true);
  }

  getLaunchedDateStr(date: Date) {
    const differenceInTime = new Date().getTime() - new Date(date).getTime();
    const diff = Math.floor(differenceInTime / (1000 * 3600 * 24));
    const suffix = diff > 1 ? 'days' : 'day';
    return `${diff} ${suffix} ago`
  }

  cancelLoading(e: any) {
    e.stopPropagation();
    this.waitingList.next(false);
    this.showCancelLoadingBtn = false;
  }
}
