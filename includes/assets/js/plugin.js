/* eslint-disable no-undef */
function reRenderMe() {
	jQuery(document).ready(function ($) {
		const targetNode = document.body;
		const config = { childList: true, subtree: true };
		const callback = function (mutationsList, observer) {
			for (const mutation of mutationsList) {
				if (mutation.type === 'childList') {
					console.log('changing data');

					observer.disconnect();
					break;
				}
			}
		};
		const observer = new MutationObserver(callback);
		observer.observe(targetNode, config);
	});
}

// wp.hooks.addFilter(
// 	'blocks.registerBlockType',
// 	'bdt/blocks/boilerplate',
// 	function (settings, name) {
// 		console.log('settings', settings);
// 	}
// );
