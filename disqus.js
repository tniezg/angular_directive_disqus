define(['disqusEmbed'], function (DISQUS) {
	var disqus = [function () {
			return {
				restrict: 'A',
				scope:{
					'disqusIdentifier':'@',
					'disqusUrl':'@'
				},
				replace:true,
				link:function(scope, element, attributes){
					element.html('<div id="disqus_thread">DISQUS</div>');
					var inject, identifier, url;

					inject=function(){
						if(attributes.disqusIdentifier!==undefined && 
								attributes.disqusUrl!==undefined){
							identifier=attributes.disqusIdentifier;
							url=attributes.disqusUrl;

							DISQUS.reset({
								reload:true,
								config: function () {
									console.log(identifier);
									console.log(url);
							    this.page.identifier = identifier;
							    this.page.url = url;
							  }
							});
						}
					};

					attributes.$observe('disqusUrl',function(url){
						inject();
					});
					attributes.$observe('disqusIdentifier',function(identifier){
						inject();
					});

					scope.$on('$destroy',function(){
						DISQUS.reset({reload:false});
						element.remove();
					});
				}
			}
		}];

	return disqus;
});