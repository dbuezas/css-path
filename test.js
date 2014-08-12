var test = require('tape')

  , document = require('global/document')
  , body = document.body

  , cssPath = require('./css-path')

test('body', function (t) {
  t.equal(cssPath(document.body), 'html > body')
  t.end()
})

test('unattached element', function (t) {
  var div = document.createElement('div')
    , span = document.createElement('span')

  t.equal(cssPath(div), 'div')

  div.setAttribute('class', 'beep boop')

  t.equal(cssPath(div), 'div.beep.boop')

  div.setAttribute('id', 'hello')

  t.equal(cssPath(div), 'div#hello')

  div.appendChild(span)

  t.equal(cssPath(span), 'div#hello > span:nth-child(1)')
  t.equal(cssPath(span, div), 'span:nth-child(1)')

  t.end()
})

test('element added to body', function (t) {
  var div = document.createElement('div')
    , div2 = document.createElement('div')
    , text = document.createTextNode('hello, world!')

  body.appendChild(div)

  div.setAttribute('class', 'foo bar')

  t.equal(cssPath(div), 'html > body > div.foo.bar:nth-child(1)')

  body.appendChild(text)
  body.appendChild(div2)

  t.equal(cssPath(div2), 'html > body > div:nth-child(2)')
  t.equal(cssPath(div2, document.documentElement), 'body > div:nth-child(2)')
  t.equal(cssPath(div2, body), 'div:nth-child(2)')

  div.setAttribute('id', 'identifier')

  t.equal(cssPath(div), 'div#identifier')

  t.end()
})