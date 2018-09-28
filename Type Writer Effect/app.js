"use strict"

const TypeWritter = function(textElement, words, waitTime = 3000) {
  this.textElement = textElement;
  this.words = words;
  this.waitTime = parseInt(waitTime);
  this.text = '';
  this.wordIndex = 0;
  this.type();
  this.isDeleting = false;
}

// type method
TypeWritter.prototype.type = function() {

  //current index of word
  const current = this.wordIndex % this.words.length;

  // get full text of current word
  const fullText = this.words[current];

  // check if deleting
  if(this.isDeleting) {
    // remove a char
    this.text = fullText.substring(0, this.text.length - 1);
  }
  else {
    // add a char
    this.text = fullText.substring(0, this.text.length + 1);
  }
  
  // insert text into element
  this.textElement.innerHTML = `<span class="text">${this.text}</span>`;

  // initial type speed
  let typeSpeed = 300;

  if(this.isDeleting)
    typeSpeed /= 2;

  // if word is complete
  if(!this.isDeleting && this.text === fullText) {
    // make pause at end
    typeSpeed = this.waitTime;
    this.isDeleting = true;
  }
  else if(this.isDeleting && this.text === '') {
    this.isDeleting = false;

    // move to the next word
    this.wordIndex++;

    // pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
}

// init on DOM load
document.addEventListener('DOMContentLoaded', init);

function init() {
  const textElement = document.querySelector('.txt-type');
  const words = JSON.parse(textElement.getAttribute('data-words'));
  const wait = textElement.getAttribute('data-wait');

  new TypeWritter(textElement, words, wait);
}