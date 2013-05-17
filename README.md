# Disqus

Allows for embedding [Disqus](http://disqus.com) dinamically, many times after the page has loaded.

## Add :
```
var disqus_shortname = 'tomekniezgoda';
```
as a global variable

## Usage inside views :
```
<div disqus-identifier="{{postId}}" disqus-url="{{url}}/{{postId}}" disqus></div>
```