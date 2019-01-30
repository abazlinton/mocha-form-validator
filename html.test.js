const cheerio = require('cheerio')
const assert = require('assert')

describe('the html', () => {

  beforeEach(() => {
    html = `<form action="post" id="ticket-purchase">
              <label for="customer-select">Customer:</label>
              <select name="customer_id" id="customer-select">
                <option value="1">Alex</option>
                <option value="2">Sian</option>
                <option value="3">Del</option>
              </select>

              <label for="film-select">Film:</label>
              <select name="film_id" id="film-select">
                <option value="1">It's a Wonderful Life</option>
                <option value="2">The Grinch</option>
                <option value="3">Home Alone</option>
                <option value="4">Home Alone 2</option>
              </select>
              <input type="submit">
            </form>`
    $ = cheerio.load(html)
  });

  it('there is a one form in the body of the html', () => {
    assert.strictEqual($('body').find('form').length, 1)
  });

  it('form has action of POST', () => {
    const body = $('body')
    const form = body.find('form')
    assert.strictEqual(form.attr('action'), 'post')
  });

  it('form has two selects', () => {
    const body = $('body')
    const form = body.find('form')
    assert.strictEqual(form.find('select').length, 2)
  });

  it('one select has a CSS id of customer-select', () => {
    assert.strictEqual($('form').find('#customer-select').length, 1)
  })

  it('one select has a CSS id of film-select', () => {
    assert.strictEqual($('form').find('#film-select').length, 1)
  })

  it('the film-select has name atrribute set to film_id', () => {
    assert.strictEqual($('#film-select').attr('name'), 'film_id')
  })

  it('the customer-select has name atrribute set to customer_id', () => {
    assert.strictEqual($('#customer-select').attr('name'), 'customer_id')
  })

  it('film-select has at least one child',() => {
    let childrenElements = $('#film-select').children()
    const hasAtLeastOneOption = childrenElements.length > 0
    assert(hasAtLeastOneOption)    
  })

  it('all children of film-select are options', () => {
    let childrenElements = $('#film-select').children()
    let children = Array.from(childrenElements)
    let allOptions = children.every(child => child.tagName === 'option')
    assert(allOptions)    
  })

  it('customer-select has at least one option',() => {
    let childrenElements = $('#customer-select').children()
    const hasAtLeastOneOption = childrenElements.length > 0
    assert(hasAtLeastOneOption)    
  })

  it('all children of customer-select are options', () => {
    let childrenElements = $('#customer-select').children()
    let children = Array.from(childrenElements)
    let allOptions = children.every(child => child.tagName === 'option')
    assert(allOptions)    
  })

  it('the value attributes of customer-select options are set from 1 to <number of options>', () => {
    let childrenElements = $('#customer-select').children()
    debugger
    const valuesCorrect = Array.from(childrenElements).every((child, index) => {
      return Number(child.attribs.value) === index + 1
    })
    assert(valuesCorrect)  
  });

  it('the value attributes of film-select options are set from 1 to <number of options>', () => {
    let childrenElements = $('#film-select').children()
    debugger
    const valuesCorrect = Array.from(childrenElements).every((child, index) => {
      return Number(child.attribs.value) === index + 1
    })
    assert(valuesCorrect)  
  });

 
});

