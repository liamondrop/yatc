import {StatusCollection} from './collections';
import {StatusView} from './views';

window.sc = new StatusCollection()
window.sc.reset([
  {id: 1, status: 'This is status 1'},
  {id: 2, status: 'This is status 2'}
]);

window.sv = new StatusView({
  el: '#root'
});
