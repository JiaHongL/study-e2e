import { browser, element, by, $$ } from 'protractor';

export class StudyE2ePage {
  AddInput = element(by.css('input.new-todo'));
  EditInput = element(by.css('input.edit'));
  AllBtn = element.all(by.css(".filters li")).get(0);
  ActiveBtn = element.all(by.css(".filters li")).get(1);
  CompletedBtn = element.all(by.css(".filters li")).get(2);
  ClearCompleteddBtn = element(by.css('.clear-completed'));
  ToggleAllCheckbox = element(by.css('.toggle-all'));

  //備註:protractor目前不支援Angular使用binding和model,官方建議使用by.css來代替.

  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.css('header h1')).getText();
  }

  isHeaderPresent() {
    return element(by.tagName('app-header')).isPresent();
  }

  isMainPresent() {
    return element(by.tagName('app-main')).isPresent();
  }

  isFooterPresent() {
    return element(by.tagName('app-footer')).isPresent();
  }

  getFooterTodoCount() {
    return element(by.css('footer .todo-count strong')).getText();
  }

  getAllItem() {
    return element.all(by.css(".todo-list li"))
  }

  getActiveItem() {
    return element.all(by.css(".todo-list li"))
      .filter((elem) => {
        return elem.getAttribute('class').then((v) => { if (v === '') { return elem; } })
      });
  }

  getCompletedItem() {
    return element.all(by.css(".todo-list li.completed"));
  }

  getEditingItem() {
    return element.all(by.css(".todo-list li.editing"));
  }

}
