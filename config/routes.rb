Rails.application.routes.draw do
  #resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post   'login'   => 'sessions#create', format: 'json'
    delete 'logout'  => 'sessions#destroy'
    get    'verify'  => 'sessions#verify_access_token', format: 'json'
    get    'forgot'  => 'password_resets#new'
    resources :users, param: :auth_token
    #resources :videos, param: :access_token
    resources :password_resets, only: [:new, :create, :edit, :update]

    root 'users#index'
end
