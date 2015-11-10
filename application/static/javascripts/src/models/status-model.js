import {Model} from 'backbone';

const StatusModel = Model.extend({
  parse(data) {
    data.parsed_text = this.parseText(data.text);
    return data;
  },

  // make urls clickable
  parseText(text) {
    const pattern = /(http[s]?:\/\/[a-z0-9\.\/]+)/gi;
    return text.replace(pattern, ($1, match) => {
      const trunc = match.replace(/http[s]?:\/\//, '');
      return `<a href="${match}" target="_blank">${trunc}</a>`;
    });
  }
});

export default StatusModel;
