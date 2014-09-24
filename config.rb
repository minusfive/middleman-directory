require 'lib/process_data'

activate :relative_assets

def slugify(s)
  s.downcase.gsub(/'/, '').gsub(/[^a-z0-9]+/, '-')
end

# Generate v4 endpoints
ignore "/api/result.json"
data.templates.each do |t|
  proxy "/templates/#{slugify(t.name)}", "/index.html"
  proxy "/api/#{slugify(t.name)}.json", "/api/result.json", locals: { t: t }
end

activate :bower
activate :emberman
activate :mmd_process_data

configure :build do
  activate :minify_css
  activate :minify_javascript
end
