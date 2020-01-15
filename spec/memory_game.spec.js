describe('Memory game', function () {

   const jsdom = require('jsdom'),
         html  = require('./html'),
         main  = require('../src/js/main');

   beforeEach(() => {
      dom      = new jsdom.JSDOM(html);
      document = dom.window.document;
   });

   // onClick btn simulator
   const onClick = btn => {
      btn.addEventListener('startGame', e => {
         main.startGame();
      });

      const e = new dom.window.Event("startGame");

      btn.dispatchEvent(e);
   }

   it('Should return start', function () {
      const btn = document.getElementById('btn');
      expect(btn.innerHTML).toBe('Start');
   });

   it('Should change Start to Pause and return pause', function () {

      const btn       = document.getElementById('btn');
      const name      = document.getElementById('name');

      // Set player name
      name.innerHTML = "Lebohang";

      // Click start button 
      onClick(btn);
      
      expect(btn.innerHTML).toBe('Pause');
   });

});