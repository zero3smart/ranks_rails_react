
Rails.application.routes.draw do



  post   'login'   => 'sessions#create'
  delete 'logout'  => 'sessions#destroy'
  get    'verify'  => 'sessions#verify_token'

  get   'profile' =>  'users#profile'
  get   'profile/edit' =>  'users#edit_profile'
  patch   'profile/update' =>  'users#update_profile'

  post   'profile/password'   => 'users#update_password'

  resources :users, param: :auth_token, only: [:index,:new,:create,:destroy,:update]


  #confirmation email router
  resources :users,  only: [:not] do
    member do
      get :confirm_email
    end
  end

  resources :posts, only: [:index, :new, :create, :edit,  :update] do
       get :search, on: :collection
     end

  resources :password_resets, only: [:new, :create, :edit,  :update]


  resources :passwords, only: [:new, :create]

  root 'users#index'


end
