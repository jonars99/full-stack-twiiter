Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'static_pages#home'
  get '/feed' => 'static_pages#feed'  #feed on all tweets
  #get '/:username' => 'static_pages#user'  user's tweets

  namespace :api do
    post '/users'    => 'users#create'
    get  '/tweets'   => 'tweets#index'
    post '/tweets'   => 'tweets#create'
    delete '/tweets/:id' => 'tweets#destroy'
  end
  
end
