package hometoogether.hometoogether.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final String uploadImagesPath;

    public WebConfig(@Value("${spring.servlet.multipart.location}") String uploadImagesPath) {
        this.uploadImagesPath = uploadImagesPath;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("file:///"+uploadImagesPath+"/");
    }
}
