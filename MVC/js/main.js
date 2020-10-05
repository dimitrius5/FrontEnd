import { Tabs } from './tabs.js';

const tabs = new Tabs({
    activeTab: 2
});

console.log(tabs)

tabs.on('change', function(curr, prev) {
    console.log('curr:', curr);
    console.log('prev:', prev);
});

$('#prev').on('click', event => tabs.prev());
$('#next').on('click', event => tabs.next());