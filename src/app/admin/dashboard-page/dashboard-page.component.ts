import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  posts: Post[] = []
  pSub: Subscription
  searchStr = ''
  dSub: Subscription

  constructor(
    private postService: PostsService,
    private alert: AlertService
    ) { }

  ngOnInit() {
    this.pSub = this.postService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  remove(id: string) {
    this.dSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
      this.alert.danger('Пост был удален')
    })
  }

   ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

     if (this.dSub) {
       this.dSub.unsubscribe()
     }
   }
}
