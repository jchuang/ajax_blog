class PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def show
    @post = Post.find(params[:id])
    @comment = Comment.new
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      redirect_to @post, notice: 'You post was added.'
    else
      flash.now[:alert] = 'There was an issue with your post'
      render :new
    end
  end

  protected
  def post_params
    params.require(:post).permit(:title, :author, :body)
  end
end
