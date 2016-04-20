module.exports = {
  'Test Setup' : function (browser) {
    browser
      .url('http://localhost:8001/demo')
      .waitForElementVisible('body', 1000)
      .assert.title('FlashcamJS Demo')
      .end();
  }
};
