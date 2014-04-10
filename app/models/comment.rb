class Comment < ActiveRecord::Base
  belongs_to :post,
    inverse_of: :comments

  validates :body, presence: true
end
