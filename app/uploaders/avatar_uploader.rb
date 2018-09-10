class AvatarUploader < CarrierWave::Uploader::Base

   include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  storage :file
 

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  #def default_url
   # '/assets/fallback/' + [version_name, 'avatar.png'].compact.join('_')
  #end




  #Profile
   version :thumb do
     process resize_to_fit: [100, 100]
   end

  # Post and comments 
   version :post do
     process resize_to_fit: [40, 40]
   end


     version :comment do
     process resize_to_fit: [32, 32]
   end

  #Topbar
   version :topbar do
     process resize_to_fit: [25, 25]
   end


 #Topbar
   version :search do
     process resize_to_fit: [72, 72]
   end
     
  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
   def extension_whitelist
     %w(jpg jpeg gif png)
   end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end
end
