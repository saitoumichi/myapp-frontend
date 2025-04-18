Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'  # ←開発中はこれでOK。公開時はVercelのドメインに限定しよう

    resource '*',
      headers: :any,
      methods: [:get, :post, :patch, :put, :delete, :options, :head]
  end
end
