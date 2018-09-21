
Rails.application.routes.draw do
  #resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post   'login'   => 'sessions#create'
  delete 'logout'  => 'sessions#destroy'
  get    'verify'  => 'sessions#verify_token'

  get   'profile' =>  'users#profile'
  get   'profile/edit' =>  'users#edit_profile'
  patch   'profile/update' =>  'users#update_profile'



  resources :users, param: :auth_token, only: [:index,:new,:create,:destroy,:update] 
   
  
#confirmation email router
    resources :users,  only: [:not] do
    member do
      get :confirm_email
    end
  end


  resources :password_resets, only: [:new, :create, :edit,  :update]


  root 'users#index'


end
