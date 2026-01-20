import * as ReactResizablePanels from 'react-resizable-panels';
console.log('Keys exported:', Object.keys(ReactResizablePanels));
if (ReactResizablePanels.PanelGroup) {
    console.log('PanelGroup is found!');
} else {
    console.error('PanelGroup is MISSING');
}
