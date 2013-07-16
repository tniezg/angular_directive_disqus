define([
	'jquery'
],function($){
	/**
	 * Treat every load like a separate request outside, but group them
	 * internally.
	 */
	var embed=function(){
		var fastForwardResolve=false,
			loading=false,
			disqusRef=null,
			disqusElementId="disqus_thread",
			pendingDeferreds=[],
			createDisqusElement=function(){
				var element=$('<div></div>')
					.attr('id', disqusElementId);

				return element;
			},
			attach=function(targetElement, config){
				var disqusElement=createDisqusElement();

				targetElement.append(disqusElement);

				console.log(disqusElement.text());

				disqusRef.reset({
					reload:true,
					config:config
				});
			},
			detach=function(){
				if(disqusRef){
					disqusRef.reset({
						reload:false
					});
					
					$('#'+disqusElementId).remove();
				}
			},
			load=function(){
				var deferred = $.Deferred(),
					abort = function(){
						deferred.reject();
					};

				if(!fastForwardResolve && !loading){
					var container = createDisqusElement()
						.appendTo($(document.body));

					loading=true;

					require(['disqus'],function(){
						disqusRef=DISQUS;

						fastForwardResolve=true;

						disqusRef.reset({
							reload:false
						});
						container.remove();

						// resolve all pending deferreds
						for(var deferredIndex=0, pending;pending=pendingDeferreds[deferredIndex];deferredIndex++){
							pending.resolve();
						}
						pendingDeferreds=[];
					});
				}else if(!fastForwardResolve && loading){
					pendingDeferreds.push(deferred);
				}else{
					deferred.resolve();
				}

				return deferred.promise({
					abort:abort
				});
			};

		return {
			load:load,
			attach:attach,
			detach:detach
		};
	};

	return embed;
});