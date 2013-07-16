define(['./disqusEmbed'], function (disqusEmbed) {
	var disqus = [function () {
			return {
				scope:{
					'disqusIdentifier':'@',
					'disqusUrl':'@',
					'disqusEnabled':'@'
				},
				replace:true,
				link:function(scope, element, attributes){
					var inject, 
						identifier, 
						enabled,
						url,
						promise, 
						createEmbed = function(){
							return Object.create(disqusEmbed());
						},
						embed=createEmbed(),
						disable=function(){
							if(promise)
								promise.abort();
							embed.detach();
						},
						enable=function(){
							promise = embed.load().done(function(){
								var config = function () {
									this.page.identifier = identifier;
									this.page.url = url;
								};

								embed.attach(element, config);
							});
						};

					inject=function(){
						if(enabled && url!==undefined && 
								identifier!==undefined){
							enable();
						}else{
							disable();
						}
					};

					attributes.$observe('disqusUrl',function(newValue){
						url=newValue;

						inject();
					});
					attributes.$observe('disqusIdentifier',function(newValue){
						identifier=newValue;

						inject();
					});

					scope.$on('$destroy',function(){
						disable();

						element.remove();
					});

					attributes.$observe('disqusEnabled',function(newValue){
						if(newValue="true"){
							enabled=true;
						}else{
							enabled=false;
						}
						inject();
					});
				}
			}
		}];

	return disqus;
});