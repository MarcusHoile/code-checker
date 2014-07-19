# app.rb
require 'compass'
require 'sinatra'
require 'sinatra/flash'
require 'sass'

enable :sessions


configure do
  Compass.add_project_configuration(File.join(Sinatra::Application.root, 'config', 'compass.rb'))
end

get '/' do
  erb :index
end


