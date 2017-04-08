import { StudyE2ePage } from './app.po';
import { browser, element, by, protractor } from 'protractor/built';

describe('study-e2e App', () => {
  let page: StudyE2ePage;

  beforeEach(() => {
    page = new StudyE2ePage();
  });

  it('should be loaded successfully', () => {
    page.navigateTo();
    expect(page.isHeaderPresent()).toBeTruthy();
    expect(page.isMainPresent()).toBeFalsy();
    expect(page.isFooterPresent()).toBeFalsy();
  });



  it('should be able to add five todo', () => {
    let TodoArray = ['繳電話費用', '繳房租', '學習Html', '學習CSS', '學習JS'];
    TodoArray.forEach(v => {
      page.AddInput.sendKeys(v);
      page.AddInput.sendKeys(protractor.Key.ENTER);
    });
    expect(page.AddInput.getText()).toEqual('');
    expect(page.isMainPresent()).toBeTruthy();
    expect(page.isFooterPresent()).toBeTruthy();
    expect(page.getActiveItem().count()).toEqual(5);
    expect(page.getCompletedItem().count()).toEqual(0);
    expect(page.getEditingItem().count()).toEqual(0);
    expect(page.getFooterTodoCount()).toEqual('5');
  });

  it('should be able to modify a todo', () => {
    let modifyStr = '繳手機費用';
    browser.actions().doubleClick(page.getActiveItem().get(4)).perform();
    expect(page.getActiveItem().count()).toEqual(4);
    expect(page.getCompletedItem().count()).toEqual(0);
    expect(page.getEditingItem().count()).toEqual(1);
    page.EditInput.clear();
    page.EditInput.sendKeys(modifyStr);
    page.EditInput.sendKeys(protractor.Key.ENTER);
    expect(page.getActiveItem().get(4).getText()).toEqual(modifyStr);
    expect(page.getActiveItem().count()).toEqual(5);
    expect(page.getCompletedItem().count()).toEqual(0);
    expect(page.getEditingItem().count()).toEqual(0);
  })

  it('two todos should be deleted', () => {
    let item5 = page.getAllItem().get(4);
    let item4 = page.getAllItem().get(3);
    browser.actions()
      .mouseMove(item5)
      .mouseMove(item5.element(by.className('destroy')))
      .click()
      .mouseMove(item4)
      .mouseMove(item4.element(by.className('destroy')))
      .click()
      .perform();
    expect(page.getActiveItem().count()).toEqual(3);
    expect(page.getCompletedItem().count()).toEqual(0);
    expect(page.getEditingItem().count()).toEqual(0);
    expect(page.getFooterTodoCount()).toEqual('3');
  })

  it('two todos should be completed', () => {
    let item2 = page.getAllItem().get(1);
    let item3 = page.getAllItem().get(2);
    browser.actions()
      .click(item2.element(by.className('toggle')))
      .click(item3.element(by.className('toggle')))
      .perform();
    expect(page.getActiveItem().count()).toEqual(1);
    expect(page.getCompletedItem().count()).toEqual(2);
    expect(page.getEditingItem().count()).toEqual(0);
    expect(page.getFooterTodoCount()).toEqual('1');

  })

  it('click activity button should be executed', () => {
    page.ActiveBtn.click();
    expect(page.getActiveItem().count()).toEqual(1);
    expect(page.getCompletedItem().count()).toEqual(0);
    expect(page.getEditingItem().count()).toEqual(0);
    expect(page.getFooterTodoCount()).toEqual('1');
  })

  it('click completed button should be executed', () => {
    page.CompletedBtn.click();
    expect(page.getActiveItem().count()).toEqual(0);
    expect(page.getCompletedItem().count()).toEqual(2);
    expect(page.getEditingItem().count()).toEqual(0);
    expect(page.getFooterTodoCount()).toEqual('1');
  })

  it('click all button should be executed', () => {
    page.AllBtn.click();
    expect(page.getActiveItem().count()).toEqual(1);
    expect(page.getCompletedItem().count()).toEqual(2);
    expect(page.getEditingItem().count()).toEqual(0);
    expect(page.getFooterTodoCount()).toEqual('1');
  })

  it('click clear complete button should be executed', () => {
    page.ClearCompleteddBtn.click();
    expect(page.getActiveItem().count()).toEqual(1);
    expect(page.getCompletedItem().count()).toEqual(0);
    expect(page.getEditingItem().count()).toEqual(0);
    expect(page.getFooterTodoCount()).toEqual('1');
  })


  it('click toggle All checkbox should be executed', () => {
    let TodoArray = ['學習ES6', '學習SASS'];
    TodoArray.forEach(v => {
      page.AddInput.sendKeys(v);
      page.AddInput.sendKeys(protractor.Key.ENTER);
    });
    page.ToggleAllCheckbox.click();
    expect(page.getActiveItem().count()).toEqual(0);
    expect(page.getCompletedItem().count()).toEqual(3);
    expect(page.getEditingItem().count()).toEqual(0);
    expect(page.getFooterTodoCount()).toEqual('0');
  })

  it('if there is no todo , should hide the content', () => {
    page.ClearCompleteddBtn.click();
    expect(page.isMainPresent()).toBeFalsy();
    expect(page.isFooterPresent()).toBeFalsy();
  })

});
