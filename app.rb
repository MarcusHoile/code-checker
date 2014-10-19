# app.rb
require 'sinatra'
require 'sinatra/flash'
require 'sass'
require 'compass'


enable :sessions


configure do
  Compass.add_project_configuration(File.join(Sinatra::Application.root, 'config', 'compass.rb'))
end

get '/' do
  erb :index
end


