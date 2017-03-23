import {Component, OnInit, OnDestroy} from "@angular/core";
import {VisTimelineItems, VisTimelineService, VisTimelineGroups} from "ng2-vis";


@Component({
  selector: 'timeline-example',
  template: `
      <h2>Timeline Test</h2>
      <h3>Basic usage</h3>
      <div [visTimeline]="visTimeline"
           [visTimelineItems]="visTimelineItems"
           [visTimelineGroups]="visTimelineGroups"
           (initialized)="timelineInitialized()"></div>
      <button type="button" class="btn btn-default" (click)="addItem()">Add and focus</button>
      <p>
        <strong>Note:</strong> Open your dev tools to see the console output when the timeline receives click events.
      </p>
    `,
})
export class VisTimelineExampleComponent implements OnInit, OnDestroy {

  public visTimeline: string = 'timelineId1';
  public visTimelineItems: VisTimelineItems;
  public visTimelineGroups: VisTimelineGroups;

  public constructor(private visTimelineService: VisTimelineService) {
  }

  public timelineInitialized(): void {
    console.log('timeline initialized');

    // now we can use the service to register on events
    this.visTimelineService.on(this.visTimeline, 'click');
    this.visTimelineService.on(this.visTimeline, 'doubleClick');


    // open your console/dev tools to see the click params
    this.visTimelineService.click
      .subscribe((eventData: any[]) => {
        if (eventData[0] === this.visTimeline) {
          console.log(eventData[1]);
        }
      });


    this.visTimelineService.doubleClick
      .subscribe((eventData: any[]) => {
        if (eventData[0] === this.visTimeline) {
          console.log('double click');
        }
      });
  }

  public addItem(): void {
    const newLength = this.visTimelineItems.getLength() + 1;
    this.visTimelineItems.add(
      {id: newLength, content: 'item ' + newLength, start: Date.now()}
    );
    this.visTimelineService.focusOnIds(this.visTimeline, [1, newLength]);
  }

  public ngOnInit(): void {
    this.visTimelineItems = this.getVisTimelineItems();
    this.visTimelineGroups = this.getVisTimelineGroups();
  }

  public ngOnDestroy(): void {
    this.visTimelineService.off(this.visTimeline, 'click');
  }


  private getVisTimelineItems() {

    return new VisTimelineItems([

      {id: '0', content: 'Period A', start: '2016-10-16', end: '2016-10-22', type: 'background', group: 1},
      {
        id: 2,
        content: 'Notification<br>21/11/2016',
        group: 1,
        start: '2016-11-21',
        end: '2016-11-29'
      },
      {
        id: 1,
        content: 'Notification<br>11/06/2016',
        group: 1,
        start: '2016-10-11',
        end: '2016-10-31'
      },
      {
        id: 20,
        group: 3,
        content: 'Date limite d\'affermissement',
        start: '2016-10-21',
        type: 'point',
        className: 'color-6'
      }

    ]);
  }

  private getVisTimelineGroups() {
    return new VisTimelineGroups([
      {id: 1, content: 'Tranche 1'},
      {id: 2, content: 'Tranche 2'},
      {id: 3, content: 'Tranche 3'}
    ]);
  }


}
