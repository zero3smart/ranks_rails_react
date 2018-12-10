
Rails.application.routes.draw do

  post   'login'   => 'sessions#create'
  delete 'logout'  => 'sessions#destroy'
  resources :users

  resources :posts, only: [:index, :new, :create, :edit,  :update] do
    get   'comments' =>  'posts#comments'
  end

  resources :comments, only: [:create, :destroy]

  root 'posts#index'

end
