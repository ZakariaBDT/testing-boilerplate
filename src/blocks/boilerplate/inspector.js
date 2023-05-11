/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TabPanel } from '@wordpress/components';

/**
 * Internal dependencies
 */
import * as Constants from './constants';
import * as Controls from '../../controls';

const { ResRangleControl } = Controls;
const { GRID_COLUMNS } = Constants;

import objAttributes from './attributes';

// import colorcontrol
// import ColorControl from '../../controls/color-control';

const Inspector = ({ attributes, setAttributes }) => {
	const { titleColor, descriptionColor } = attributes;
	const objAttrs = { attributes, setAttributes, objAttributes };

	console.log(attributes);

	return (
		<div className="bdt-inspector-controls">
			<InspectorControls>
				<TabPanel
					className="my-tab-panel"
					activeClass="active-tab"
					tabs={[
						{
							name: 'desk',
							title: 'Desk',
							className: 'desk-tab',
						},
						{
							name: 'tab',
							title: 'Tab',
							className: 'tab-tab',
						},
						{
							name: 'mob',
							title: 'Mob',
							className: 'mob-tab',
						},
					]}
				>
					{(tab) => {
						if (tab.name === 'desk') {
							return (
								<>
									<PanelBody
										title={__(
											'Column Settings',
											'bdt-blocks'
										)}
									>
										<ResRangleControl
											label={__(
												'Grid Columns',
												'bdt-blocks'
											)}
											controlName={GRID_COLUMNS}
											objAttrs={objAttrs}
											noUnits={false}
											min={1}
											max={4}
										/>
									</PanelBody>
								</>
							);
						}
						if (tab.name === 'tab') {
							return <>Hello Tab</>;
						}
						if (tab.name === 'mob') {
							return <>sfsf</>;
						}
					}}
				</TabPanel>
			</InspectorControls>
		</div>
	);
};

export default Inspector;
