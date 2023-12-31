class InventoriesController < ApplicationController
  before_action :set_inventory, only: %i[show update destroy]

  # GET /inventories
  def index
    @inventories = Inventory.all
    render json: @inventories
  end

  # GET /inventories/:user_id
  def show
    render json: @inventory
  end

  # POST /inventories
  def create
    @inventory = Inventory.new(inventory_params)

    if @inventory.save
      render json: @inventory, status: :created, location: @inventory
    else
      render json: @inventory.errors, status: :unprocessable_entity
    end
  end

  def decrement_money
    @inventory = Inventory.find_by(user_id: params[:user_id])
    @inventory.money -= params[:money]
    @inventory.save
  end

  # PATCH/PUT /inventories/:user_id
  def update
    if sufficient_money_and_items?
      update_params.each { |key, value| @inventory.increment(key, value) }
      if @inventory.save
        render json: @inventory, status: :ok
      else
        render json: @inventory.errors, status: :unprocessable_entity
      end
    else
      render json: {
               error: "Insufficient money or items !"
             },
             status: :bad_request
    end
  end

  # DELETE /inventories/:user_id
  def destroy
    @inventory.destroy
    head :no_content
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_inventory
    @inventory = Inventory.find_by(user_id: params[:id])
    Rails.logger.debug "Inventory object: #{@inventory.inspect}"
    unless @inventory
      render json: { error: "Inventory not found" }, status: :not_found
    end
  end

  def update_params
    params.require(:inventory).permit!
  end
  def sufficient_money_and_items?
    update_params.to_h.all? do |key, value|
      value.negative? ? @inventory.send(key).to_i + value >= 0 : true
    end
  end

  def inventory_params
    params.require(:inventory).permit!
  end
end
