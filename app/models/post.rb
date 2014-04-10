class Post < ActiveRecord::Base
  has_many :comments,
    inverse_of: :post,
    dependent: :destroy
end
