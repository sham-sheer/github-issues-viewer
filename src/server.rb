require 'sinatra'
require 'rest-client'
require 'json'

CLIENT_ID = ENV['d14c97834e4fa5fce69b']
CLIENT_SECRET = ENV['b789003e3a10a68fabb07c4bece604d88255193e']

get '/' do
  erb :index, :locals => {:client_id => CLIENT_ID}
end
