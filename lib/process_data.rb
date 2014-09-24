module MiddlemanDirectory
  class ProcessData < Middleman::Extension
    def initialize(app, options_hash={}, &block)
      super

      app.set :directory_data, { items: [], categories: [] }
    end

    def after_configuration
      process_categories
    end

    def manipulate_resource_list(resources)
      # Index proxies, all data
      app.proxy "/api/1/directory_items.json", "/api/result.json",
        locals: {t: { categories:       app.directory_data[:categories],
                      directory_items:  app.directory_data[:items]}}
      app.proxy "/api/1/categories.json", "/api/result.json",
        locals: {t: { categories:       app.directory_data[:categories],
                      directory_items:  app.directory_data[:items]}}
      resources
    end

    private

    def process_categories
      app.directory_data[:categories] = app.data.to_h.keys.map do |cat_name|
        process_category(cat_name)
      end.compact.uniq
    end

    def process_category(cat_name)
      cat_id  = cat_name.parameterize
      cat     = {
        id:                 cat_id,
        name:               cat_name,
        tags:               [],
        directory_item_ids: []
      }

      cat = process_category_items(cat)
      cat[:tags].flatten!
      cat[:tags].compact!
      cat[:tags].uniq!
      cat[:tags].sort!
      setup_category_proxies(cat)
      cat
    end

    def process_category_items(cat)
      items = app.data[cat[:name]].map do |i|
        i[:id]                    =   i[:name].parameterize
        i[:category_id]           =   cat[:id]
        i[:tags]                  =   (i[:tags] || []).map(&:downcase)
        cat[:tags]                <<  i[:tags]
        cat[:directory_item_ids]  <<  i[:id]
        i
      end
      app.directory_data[:items].concat(items).uniq!
      cat
    end

    def setup_category_proxies(cat)
      app.proxy "/#{cat[:id]}", "/index.html"
      app.proxy "/#{cat[:id]}/all", "/index.html"
      app.proxy "/api/1/categories/#{cat[:id]}.json", "/api/result.json",
        locals: {t: {category: cat}}

      cat[:tags].each do |tag|
        app.proxy "/#{cat[:id]}/#{tag}", "/index.html"
      end

      def setup_item_proxies(i)
        app.proxy "/api/1/directory_items/#{i[:id]}.json", "/api/result.json",
          locals: {t: {directory_item: i}}
      end
    end
  end
end

MiddlemanDirectory::ProcessData.register :mmd_process_data
