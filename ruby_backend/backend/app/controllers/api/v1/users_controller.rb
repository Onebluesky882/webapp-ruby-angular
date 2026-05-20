class Api::V1::UsersController < ApplicationController
  def index
    users = Users::Services::Service.get_users
    render json: users
  end

  def show
    user = Users::Services::Service.get_user(params[:id])
    render json: user
  end

  def create
    user = Users::Services::Service.create_user(user_params)
    render json: user
  end

  def update
    user = Users::Services::Service.update_user(params[:id], user_params)
    render json: user
  end

  def destroy
    Users::Services::Service.delete_user(params[:id])
    head :no_content
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end