use std::{fs, path::Path};

static TEXT_DIGITS: [&str; 9] = [
  "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
];

static REVERSED_TEXT_DIGITS: [&str; 9] = [
  "eno", "owt", "eerht", "ruof", "evif", "xis", "neves", "thgie", "enin",
];

fn main() {
  let file_path = Path::new("../test.txt");
  let file = fs::read_to_string(file_path);

  let file_content = match file {
    Err(_) => {
      println!("File not found");
      return;
    }
    Ok(_) => file.unwrap(),
  };

  let lines = file_content.split('\n');

  let mut sum: Option<u32> = Some(0);

  for line in lines {
    if line.len() == 0 {
      continue;
    }

    sum = traverse_left(line).zip(sum).map(|(x, y)| x + y);
    sum = traverse_right(line).zip(sum).map(|(x, y)| x + y);
  }

  println!("{:?}", sum);
}

fn traverse_left(line: &str) -> Option<u32> {
  for char in line.chars() {
    if char.is_ascii_digit() {
      return char.to_digit(10);
    }
  }

  return None;
}

fn traverse_right(line: &str) -> Option<u32> {
  let line_string = String::from(line).replace('\r', "");

  let chars = line_string.char_indices().rev();
  let mut search_digits = REVERSED_TEXT_DIGITS.iter().enumerate();

  for (i, char) in chars {
    if char.is_ascii_digit() {
      return char.to_digit(10);
    }

    let mut j = i as i32;
    while j >= 0 {
      let sub_str = &line_string[j as usize..i + char.len_utf8()];

      println!("{}", j);
      println!("{}", sub_str);

      let found = search_digits.find(|(_, &x)| x.starts_with(sub_str));

      match found {
        None => j = 0,
        Some((index, &el)) => {
          if el.len() == sub_str.len() {
            return Some((index + 1) as u32);
          }
        }
      }

      j = j - 1;
    }
  }

  return None;
}
