/* eslint-disable no-console */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

const { Fragment, useEffect } = wp.element;

// editor style
import './editor.scss';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import { softMinifyCssStrings } from '../../helper/softminify';

import * as Constants from './constants';
const { GRID_COLUMNS } = Constants;

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		uniqueId,
		blockStyle,
		title,
		titleColor,
		description,
		descriptionColor,
	} = attributes;

	useEffect(() => {
		if (!uniqueId) {
			setAttributes({ uniqueId: `bdt-blocks-${clientId.slice(0, 8)}` });
		}
	}, []);

	const deskCols = attributes[`${GRID_COLUMNS}DeskRange`];
	const tabCols = attributes[`${GRID_COLUMNS}TabRange`];
	const mobCols = attributes[`${GRID_COLUMNS}MobRange`];

	console.log(deskCols);

	const deskStyles = `
		.${uniqueId} .bdt-title {
			color: ${titleColor};
			grid-column: ${deskCols};
		}
		.${uniqueId} .bdt-description {
			color: ${descriptionColor};
		}
	`;
	const tabStyles = `.${uniqueId} .bdt-title {
		grid-column: ${tabCols};
	}`;
	const mobStyles = `.${uniqueId} .bdt-title {
		grid-column: ${mobCols};
	}`;

	/**
	 * Block All Styles
	 */
	const blockStyleCss = `
		${deskStyles}
		@media (max-width: 1024px) and (min-width: 768px) {
			${tabStyles}
		}
		@media (max-width: 767px) {
			${mobStyles}
		}
	`;

	useEffect(() => {
		if (JSON.stringify(blockStyle) !== JSON.stringify(blockStyleCss)) {
			setAttributes({ blockStyle: blockStyleCss });
		}
	}, [attributes]);

	return (
		<Fragment>
			<style>{`${softMinifyCssStrings(blockStyleCss)}`}</style>
			<Inspector attributes={attributes} setAttributes={setAttributes} />
			<div
				{...useBlockProps({
					className: uniqueId,
				})}
			>
				<RichText
					tagName="h2"
					className="bdt-title"
					value={title}
					onChange={(content) => setAttributes({ title: content })}
					placeholder={__('Write title…', 'bdt-blocks')}
				/>
				<RichText
					tagName="p"
					className="bdt-description"
					value={description}
					onChange={(content) =>
						setAttributes({ description: content })
					}
					placeholder={__('Write description…', 'bdt-blocks')}
				/>

				<button id="clickme">Click Me</button>
			</div>
		</Fragment>
	);
}
