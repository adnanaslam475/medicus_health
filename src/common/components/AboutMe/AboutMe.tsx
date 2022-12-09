import { Form, Input } from "antd";
import React from "react";
const { TextArea } = Input;

const AboutMe = () => {
  return (
    <div className="mt-5">
      <Form.Item label="About me" name="about_me" className="flex-1">
        <TextArea
          rows={10}
          placeholder="Vivamus efficitur, risus eu gravida gravida, ante metus accumsan nulla, eu iaculis ex ante id nibh. In vehicula ligula vitae pulvinar malesuada. Pellentesque dictum suscipit risus, sit amet euismod dui interdum et. Sed iaculis justo at feugiat porttitor. In auctor egestas urna, sit amet aliquam ex vulputate eu. Proin ultricies, enim sit amet porta tincidunt, nulla elit hendrerit nibh, vel molestie lectus massa a nisl. Aenean ac dolor consectetur, tincidunt risus finibus, tempor risus. Curabitur a eros sed ex molestie interdum. In dapibus elit metus, quis scelerisque elit dignissim sed. Morbi ultricies, risus in viverra rhoncus, massa libero hendrerit lacus, sit amet posuere mi nibh mollis neque."
          maxLength={6}
          disabled
        />
      </Form.Item>
    </div>
  );
};

export default AboutMe;
