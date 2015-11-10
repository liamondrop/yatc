import {template} from 'underscore';

const statusPanelTemplate = template(`
<div class="panel panel-default">
  <div class="status-panel">
    <div class="panel-body">
      <div class="status-content">
        <div class="status-header">
          <a href="https://twitter.com/<%= screen_name %>" target="_blank">
            <img class="avatar" src="<%= profile_image_url %>">
            <strong class="fullname"><%= name %></strong>
            <span class="data screen-name">@<%= screen_name %></span>
          </a>
        </div>
        <p class="tweet-text"><%= parsed_text %></p>
      </div>
    </div>
    <div class="panel-footer status-footer">
      <div class="status-footer-content">
        <span class="retweet-count">
          <strong class="rt-num"><%= retweet_count.toLocaleString() %></strong>
          <span class="data rt-label">retweet<%= retweet_count === 1 ? '' : 's' %></span>
        </span>
        <span class="data created-at pull-right">
          <%= created_at_local %>
        </span>
      </div>
    </div>
  </div>
</div>
`);

// accepts a backbone collection or an array of backbone models
// returns an array of html strings
export default function statusPanels(collection) {
  return collection.map(model => {
    return statusPanelTemplate(model.toJSON());
  });
}