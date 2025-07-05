#!/bin/bash

# 脚本名称：generate_random_data.sh
# 功能：生成指定长度的随机数据，转换为 16 进制，再转换为字母，并清除敏感数据

# 检查参数数量
if [ $# -ne 1 ]; then
  echo "用法：$0 <长度 (字节)>"
  exit 1
fi

# 获取长度参数
length=$1

# 检查长度是否为数字
if ! [[ "$length" =~ ^[0-9]+$ ]]; then
  echo "错误：长度必须是数字"
  exit 1
fi

# 检查 /dev/random 是否存在
if [ ! -c /dev/random ]; then
  echo "错误：/dev/random 不存在"
  exit 1
fi

# 生成随机数据，转换为 16 进制
random_hex=$(head -c "$length" /dev/random | od -An -t x1 | tr -d ' ')

# 将 16 进制转换为字母
random_letters=$(echo "$random_hex" | sed 's/\([0-9a-f][0-9a-f]\)/\\x\1/g' | xargs printf "%b")

# 打印结果
echo "$random_letters"

# 清除敏感数据
unset random_hex
unset random_letters

# 使用 shred 命令覆盖内存 (可选，需要 root 权限)
#echo -n "$random_letters" | shred -z -n 3

exit 0
