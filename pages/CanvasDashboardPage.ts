import AbstractPage from "../pages/AbstractPage";


class CanvasDashboardPage extends AbstractPage {
    

    getCanvasDashboardPageTitle() {
        this.waitForPageLoaded();
        let title = null;
        try {
          title = browser.getTitle();
          console.log("Page title = " + title);
        } catch (error) {
          console.log(error + "Could not get title");
        }
        return title;
      }


}


export default new CanvasDashboardPage();