export enum VideoChatPage {
  joinAvideoMeeting = '//*[text()="Join a video meeting"][@class="inner-element"]',
}

class VideoChat {
  get joinVideoChat() {
    return $(VideoChatPage.joinAvideoMeeting);
  }
}

export default new VideoChat();
