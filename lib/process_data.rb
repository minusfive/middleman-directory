module MiddlemanDirectory
  class ProcessData < Middleman::Extension
    def initialize(app, options_hash={}, &block)
      super

      app.set :directory_data, { items: [], categories: [] }
    end

    def after_configuration
      process_categories
    end

    helpers do
      def directory_categories
        directory_data[:categories]
      end

      def directory_items
        directory_data[:items]
      end
    end

    private

    def categories
      app.directory_data[:categories]
    end

    def items
      app.directory_data[:items]
    end

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
      app.directory_data[:items] << app.data[cat[:name]].map do |i|
        i[:id]                    =   i[:name].parameterize
        i[:category_id]           =   cat[:id]
        cat[:tags]                <<  i[:tags]
        cat[:directory_item_ids]  <<  i[:id]
        i
      end
      cat
    end

    def setup_category_proxies(cat)
      app.proxy "/#{cat[:name]}", "/index.html"
      app.proxy "/#{cat[:name]}/all", "/index.html"

      cat[:tags].each do |tag|
        app.proxy "/#{cat[:name]}/#{tag}", "/index.html"
      end
    end
  end
end

MiddlemanDirectory::ProcessData.register :mmd_process_data
